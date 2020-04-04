export const requestTextAnalysisResult = async (url) => {
    const classifyRes = await fetch(`/api/classify?url=${encodeURIComponent(url)}`)
    return classifyRes.json()
}

export const requestTextSummarizationResult = async (url) => {
    const res = await fetch(`/api/summarize?url=${encodeURIComponent(url)}`)
    return res.json()
}
