module mash111_tb;
    parameter integer WIDTH = 12;
    logic clk=0;
    logic reset, in_valid, dither_enable;
    logic [WIDTH-1:0] word_in,dither_amplitude;
    logic [15:0] seed;
    logic out_valid,carry1;
    logic [WIDTH-1:0] used_word,residue1,residue2,residue3;
    logic signed [3:0] mash11_out,mash111_out;
    mash111 #(.WIDTH(WIDTH)) dut (.*);

    string vector_file;
    integer file, fields, count=0;
    integer rst, valid, word, enable, amplitude, init_seed;
    integer exp_valid, exp_used, exp_c1, exp_y2, exp_y3, exp_r1, exp_r2, exp_r3;
    initial begin
        if (!$value$plusargs("vectors=%s", vector_file)) $fatal(1, "vectors required");
        file = $fopen(vector_file, "r");
        if (!file) $fatal(1, "cannot open vectors");
        fields = $fscanf(file,"%d %d %d %d %d %d %d %d %d %d %d %d %d %d",
                         rst,valid,word,enable,amplitude,init_seed,exp_valid,exp_used,exp_c1,
                         exp_y2,exp_y3,exp_r1,exp_r2,exp_r3);
        while (fields == 14) begin
            reset=rst; in_valid=valid; word_in=word; dither_enable=enable;
            dither_amplitude=amplitude; seed=init_seed;
            #1; clk=1; #1;
            if (out_valid !== exp_valid[0] || used_word !== exp_used[WIDTH-1:0] ||
                carry1 !== exp_c1[0] || mash11_out !== exp_y2[3:0] || mash111_out !== exp_y3[3:0] ||
                residue1 !== exp_r1[WIDTH-1:0] || residue2 !== exp_r2[WIDTH-1:0] ||
                residue3 !== exp_r3[WIDTH-1:0])
                $fatal(1,"WIDTH=%0d row=%0d expected y2=%0d y3=%0d, got y2=%0d y3=%0d",
                       WIDTH,count,exp_y2,exp_y3,mash11_out,mash111_out);
            clk=0;
            count=count+1;
            fields = $fscanf(file,"%d %d %d %d %d %d %d %d %d %d %d %d %d %d",
                             rst,valid,word,enable,amplitude,init_seed,exp_valid,exp_used,exp_c1,
                             exp_y2,exp_y3,exp_r1,exp_r2,exp_r3);
        end
        if (count != 4096) $fatal(1,"Expected 4096 vectors, got %0d",count);
        $display("PASS WIDTH=%0d vectors=%0d",WIDTH,count);
        $finish;
    end
endmodule
