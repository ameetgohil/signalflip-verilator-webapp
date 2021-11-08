const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dut = require('./counter/build/Release/dut.node');
const {Sim, SimUtils, RisingEdge, RisingEdges, FallingEdge, FallingEdges, Edge, Edges, Interfaces} = require('signalflip-js');
const { Clock } = SimUtils;
const _ = require('lodash');

let sim;

let setup = (name) => {
    // set up the environment
    dut.init(name); // Init dut
    sim = new Sim(dut);
    
    // TODO: Create clock
    let clk = new Clock(dut.clk, 1);
    sim.addClock(clk);
    
    // TODO: Add setup code (interfaces, transaction, ...) etc...

    // TODO: Add reset task
    sim.addTask(function* () {
        dut.rstf(0);
        yield* RisingEdges(dut.clk, 10); // assert reset low for 10 clock cycles
        dut.rstf(1);
        yield* RisingEdge(dut.clk);
    }(), 'RESET');

    // TODO: Add post_run tasks (test checking)
    // sim.addTask(() => { /* post_run function */}, 'POST_RUN'});

};

let runSim = () => {
    setup('top');
    let outputStrArr = [];
    sim.addTask(function* () {
        let cycle = 0;
        while(true) {
            yield* RisingEdge(dut.clk);
            outputStrArr.push('Cycle: ' + cycle + ' Count: ' + dut.count());
        }
    }());
    
    dut.enable(1);
    sim.run(100);
    return outputStrArr;
};

app.listen(port, () => console.log('Listening on port ${port}' + runSim().join('\n')));
let x = Math.random();
app.get('/express_backend', (req, res) => {
    console.log(Math.random());
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT random number: ' + Math.random(),  simoutput: runSim().join(',')});
});


