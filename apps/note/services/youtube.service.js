import { utilService } from "../../../services/util.service.js"

const YOUTUBE_DATA_API_KEY = 'AIzaSyA2ia5C6WOUHLzC3_MP1GOZs6pDEv3ga3c'

export const youtubeService = {
    getVideos,
    printToConsoleRandomYoutubeVideos
}

// Debug:
// window.yts = youtubeService

function getVideos(value) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_DATA_API_KEY}&q=${value}`)
        .then(res => {
            let ans = res.data.items.map(item => ({
                title: item.snippet.title,
                videoUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
                thumbnail: item.snippet.thumbnails.high.url
            }))
            return ans
        })
        .catch(console.error)
}

function printToConsoleRandomYoutubeVideos(count = 10) {
    const subjects = ['beatles', 'funny', 'galaxy', 'best food', 'lions', 'birds']
    for (let i = 0; i < count; i++) {
        const randomSubject = utilService.getRandomItems(subjects)
        youtubeService.getVideos(randomSubject).then(console.log)
    }
}