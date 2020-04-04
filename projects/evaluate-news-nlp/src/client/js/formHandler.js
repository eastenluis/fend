import debounce from 'lodash/debounce'

import { requestTextAnalysisResult, requestTextSummarizationResult } from './apis'

const setErrorMessage = (message) => {
    const errorMessage = document.getElementById('error-message')
    errorMessage.innerText = message
}

const validateFormValue = value => {
    const urlPattern = /^((http|https):\/\/)([a-zA-Z0-9]+(:[0-9])?)[a-zA-Z0-9\.\-\_~\/&\?\$\#\=\%]*$/i
    const submitButton = document.getElementById('analyze-button')
    if (!value) {
        submitButton.setAttribute('disabled', 'true')
        setErrorMessage('URL is required.')
        return false
    } else if (!urlPattern.test(value)) {
        submitButton.setAttribute('disabled', 'true')
        setErrorMessage('Please enter a valid URL (e.g. https://udacity.com).')
        return false
    } else {
        submitButton.removeAttribute('disabled')
        setErrorMessage('')
        return true
    }
}

const updateSearchResult = (language, categories, sentences) => {
    const langSection = document.getElementById('text-language')
    langSection.innerText = language

    const categorySection = document.getElementById('text-categories')
    categorySection.innerHTML = ''
    categories.forEach(category => {
        const item = document.createElement('span')
        item.className = 'category-label'
        item.innerText = category.label
        categorySection.appendChild(item)
    })

    const summarySection = document.getElementById('text-summarization')
    summarySection.innerText = sentences

    document.getElementById('analysis-result').style.visibility = 'visible'
}

export const handleSubmit = (event) => {
    event.preventDefault()
    const value = document.getElementById('article-url').value
    if (!validateFormValue(value)) {
        return false
    }

    Promise
        .all([requestTextAnalysisResult(value), requestTextSummarizationResult(value)])
        .then(([classification, summarization]) => {
            const { language, categories } = classification
            const { sentences } = summarization

            updateSearchResult(language, categories, sentences)
        }).catch(error => {
            console.error(error)
            setErrorMessage('Failed to analyze given URL.')
        })
}

/**
 * Validate input value on key up.
 */
export const onKeyUp = debounce((event) => {
    const value = event.target.value ? event.target.value.trim() : ''
    validateFormValue(value)
}, 500)
