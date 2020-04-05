import { requestTextAnalysisResult, requestTextSummarizationResult } from '../js/apis'

describe('Test APIs', () => {
    const originFetch = window.fetch
    beforeEach(() => {
        window.fetch = jest.fn()
    })
    afterEach(() => {
        window.fetch = originFetch
    })

    it('requests text classification correctly', () => {
        const mockURL = 'https://example.com'
        requestTextAnalysisResult(mockURL)
        expect(window.fetch).toHaveBeenCalledWith(`/api/classify?url=${encodeURIComponent(mockURL)}`)
    })

    it('requests text summarization correctly', () => {
        const mockURL = 'https://example.com'
        requestTextSummarizationResult(mockURL)
        expect(window.fetch).toHaveBeenCalledWith(`/api/summarize?url=${encodeURIComponent(mockURL)}`)
    })
})
