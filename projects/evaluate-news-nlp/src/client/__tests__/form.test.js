import { INPUT_DEBOUNCE, onKeyUp, handleSubmit } from '../js/formHandler'

jest.mock('../js/apis')
import { requestTextAnalysisResult, requestTextSummarizationResult } from '../js/apis'

const formHTML = `
<section>
<form class="search-bar" name="url-form" onsubmit="return nlpApp.handleSubmit(event)">
    <div class="split-group">
        <input type="url" name="article-url" id="article-url" value=""
            placeholder="News/Blogs/Articles URL" required onkeyup="return nlpApp.onKeyUp(event)">
        <button type="submit" class="nlp-button" id="analyze-button" disabled>Analyze</button>
    </div>
    <div id="error-message"></div>
</form>
</section>
`
const displayResultHTML = `
<section id="analysis-result" style="visibility: hidden;">
    <div class="result-label">Language</div>
    <div id="text-language" class="result-value"></div>
    <div class="result-label">Categories</div>
    <div id="text-categories" class="result-value"></div>
    <div class="result-label">Summarization</div>
    <div id="text-summarization" class="result-value"></div>
</section>
`

describe('Form validation', () => {
    beforeEach(() => {
        document.body.innerHTML = formHTML
    })

    function assertErrorMessage(expected) {
        const errorMessage = document.getElementById('error-message')
        expect(errorMessage.innerText).toEqual(expected)
    }

    function assertSubmitButtonEnabled(enabled) {
        const button = document.getElementById('analyze-button')
        if (enabled)
            expect(button.hasAttribute('disabled')).toBeFalsy()
        else
            expect(button.getAttribute('disabled')).toBe('true')
    }

    it('displays error message when URL is not missing', done => {
        const mockKeyUpEvent = {
            target: { value: '' }
        }
        onKeyUp(mockKeyUpEvent)
        setTimeout(() => {
            assertErrorMessage('URL is required.')
            assertSubmitButtonEnabled(false)
            done()
        }, INPUT_DEBOUNCE + 2)
    })

    it('displays error message when URL is invalid', done => {
        const mockKeyUpEvent = {
            target: { value: 'invalid-url' }
        }
        onKeyUp(mockKeyUpEvent)
        setTimeout(() => {
            assertErrorMessage('Please enter a valid URL (e.g. https://udacity.com).')
            assertSubmitButtonEnabled(false)
            done()
        }, INPUT_DEBOUNCE + 2)
    })

    it('clears error message when URL is valid', done => {
        const mockKeyUpEvent = {
            target: { value: 'http://example.com/valid-article' }
        }
        onKeyUp(mockKeyUpEvent)
        setTimeout(() => {
            assertErrorMessage('')
            assertSubmitButtonEnabled(true)
            done()
        }, INPUT_DEBOUNCE + 2)
    })
})

describe('Form submission', () => {
    const mockArticleURL = 'https://example.com/valid-article'
    beforeEach(() => {
        document.body.innerHTML = formHTML + displayResultHTML
    })

    it('requests text classification and summarization upon submission.', () => {
        document.getElementById('article-url').value = 'https://example.com/valid-article'
        requestTextSummarizationResult.mockReturnValue({ sentences: ['test sentence'] })
        requestTextAnalysisResult.mockReturnValue({ language: 'en', categories: [{ label: 'programming' }] })

        handleSubmit(new Event('submit'))
        expect(requestTextAnalysisResult).toHaveBeenCalledWith(mockArticleURL)
        expect(requestTextSummarizationResult).toHaveBeenCalledWith(mockArticleURL)
    })
})
