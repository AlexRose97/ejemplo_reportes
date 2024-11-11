import * as reportService from "../../../services/report/controllers/report.controller";

const mockRequest = () => {
    let req: any = {}
    req.body = {};
    req.params = {};
    return req;
}

const mockResponse = () => {
    let res: any = {}
    res.status = jest.fn().mockReturnValue({ json: jest.fn() })
    res.setHeader = jest.fn()
    res.send = jest.fn().mockReturnThis()
    res.json = jest.fn().mockResolvedValue(res);
    return res;
}


describe('report.controller.ts', () => {
    describe('getXLSXReport', () => {
        test('should be Ok code 200', async () => {
            const req = mockRequest();
            const res = mockResponse();
            await reportService.getXLSXReport(req, res);
            expect(res.status).toHaveBeenCalledWith(200)
        });
    });
    describe('getPDFReport', () => {
        test('should be Ok, code 200', async () => {
            const req = mockRequest();
            const res = mockResponse();
            await reportService.getPDFReport(req, res);
            expect(res.status).toHaveBeenCalledWith(200)
        });
    });
});