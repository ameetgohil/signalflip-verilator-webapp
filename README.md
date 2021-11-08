# signalflip-verilator-webapp
A web app showing a example counter systemverilog design with testbench written in signalflip-js using Verilator as a simulator

## First build the counter NAPI module (assumes starting at the base of the repository)
```bash
cd server/counter
npm i
make
```
## Run the server (assumes starting at the base of the repository)
```bash
cd server
npm i
node server.js
```

## Start the react app (assumes starting at the base of the repository)
```bash
cd client
npm i
npm start
```

## Output
The output shows the counter value at each clock cycle. Each time the page is reloaded, the server intializes the dut and runs the simulation again
