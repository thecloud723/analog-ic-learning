module mash111 #(
    parameter integer WIDTH = 12
) (
    input  logic clk,
    input  logic reset,
    input  logic in_valid,
    input  logic [WIDTH-1:0] word_in,
    input  logic dither_enable,
    input  logic [WIDTH-1:0] dither_amplitude,
    input  logic [15:0] seed,
    output logic out_valid,
    output logic [WIDTH-1:0] used_word, residue1, residue2, residue3,
    output logic carry1,
    output logic signed [3:0] mash11_out, mash111_out
);
    logic [15:0] lfsr;
    logic c2_previous, c3_previous, c3_older;
    logic signed [WIDTH+1:0] adjusted;
    logic [WIDTH-1:0] effective;
    logic [WIDTH:0] sum1, sum2, sum3;
    logic signed [4:0] shaped2, shaped3;

    always_comb begin
        adjusted = $signed({2'b00, word_in});
        if (dither_enable && lfsr[0] != lfsr[1]) begin
            if (lfsr[0])
                adjusted = adjusted + $signed({2'b00, dither_amplitude});
            else
                adjusted = adjusted - $signed({2'b00, dither_amplitude});
        end
        if (adjusted < 0)
            effective = '0;
        else if (adjusted > $signed({2'b00, {WIDTH{1'b1}}}))
            effective = '1;
        else
            effective = adjusted[WIDTH-1:0];

        // Use the current cycle's new residues for stages two and three.
        sum1 = {1'b0, residue1} + {1'b0, effective};
        sum2 = {1'b0, residue2} + {1'b0, sum1[WIDTH-1:0]};
        sum3 = {1'b0, residue3} + {1'b0, sum2[WIDTH-1:0]};
        shaped2 = $signed({4'b0, sum1[WIDTH]}) +
                  $signed({4'b0, sum2[WIDTH]}) - $signed({4'b0, c2_previous});
        shaped3 = shaped2 + $signed({4'b0, sum3[WIDTH]}) -
                  ($signed({4'b0, c3_previous}) <<< 1) + $signed({4'b0, c3_older});
    end

    always_ff @(posedge clk) begin
        if (reset) begin
            residue1 <= '0;
            residue2 <= '0;
            residue3 <= '0;
            used_word <= '0;
            carry1 <= 1'b0;
            mash11_out <= '0;
            mash111_out <= '0;
            c2_previous <= 1'b0;
            c3_previous <= 1'b0;
            c3_older <= 1'b0;
            lfsr <= seed == 0 ? 16'h0001 : seed;
            out_valid <= 1'b0;
        end else begin
            out_valid <= in_valid;
            if (in_valid) begin
                used_word <= effective;
                residue1 <= sum1[WIDTH-1:0];
                residue2 <= sum2[WIDTH-1:0];
                residue3 <= sum3[WIDTH-1:0];
                carry1 <= sum1[WIDTH];
                mash11_out <= shaped2[3:0];
                mash111_out <= shaped3[3:0];
                c2_previous <= sum2[WIDTH];
                c3_previous <= sum3[WIDTH];
                c3_older <= c3_previous;
                lfsr <= (lfsr >> 1) ^ (lfsr[0] ? 16'hb400 : 16'h0000);
            end
        end
    end
endmodule
