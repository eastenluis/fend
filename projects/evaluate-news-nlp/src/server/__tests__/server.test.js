const request = require('supertest');

const app = require('../server')
jest.mock('../textApiClient')
const mockTextClient = require('../textApiClient')

describe('classification APIs', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('returns correct classification information', async () => {
        const mockResponseBody = { language: "en", categories: [] }
        mockTextClient.classify.mockImplementation((url, callback) => {
            callback(null, mockResponseBody)
        })
        await request(app)
            .get(`/api/classify?url=${encodeURIComponent("https://example.com")}`)
            .expect(200, mockResponseBody)
    })

    it('returns 400 if url is missing', async () => {
        await request(app)
            .get(`/api/classify`)
            .expect(400)
    })
})

describe('summarization APIs', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('returns correct summarization information', async () => {
        const mockResponseBody = { sentences: "test summarization" }
        mockTextClient.summarize.mockImplementation((url, callback) => {
            callback(null, mockResponseBody)
        })
        await request(app)
            .get(`/api/summarize?url=${encodeURIComponent("https://example.com")}`)
            .expect(200, mockResponseBody)
    })

    it('returns 400 if url is missing', async () => {
        await request(app)
            .get(`/api/summarize`)
            .expect(400)
    })
})
