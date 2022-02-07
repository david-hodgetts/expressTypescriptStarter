import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../src/app';


chai.use(chaiHttp);
const should = chai.should();


describe("/", function () {

    it("it should return 'hello world'", async () => {
        try {
            const res = await chai.request(app).get('/');
            res.status.should.equal(200);
            res.body.should.equal("hello world");

        } catch (err) {
            console.log('Oups ---ERR', err);
            should.not.exist(err);
        }
    });
});