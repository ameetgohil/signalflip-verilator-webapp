module counter
  (
   input wire enable,
   output reg [7:0] count,
   input wire clk, rstf
   );

   always_ff @(posedge clk or negedge rstf) begin
      if(~rstf)
        count <= 0;
      else if(enable)
        count <= count + 1;
      
   end
endmodule

