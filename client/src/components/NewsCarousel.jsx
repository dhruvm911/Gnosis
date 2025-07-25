import { useState, useEffect } from "react"
import { fetchAllNews,postNews } from "../api/newsApi"

const NewsCarousel = () => {
  const [news, setNews] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchAllNews()
        setNews(data)
      } catch (err) {
        console.error("Failed to load news", err)
      }
    }
    loadNews()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % news.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [news.length])

  if (news.length === 0) return <p className="text-white">No news available</p>

  return (
    <div className="backdrop-blur-md bg-black/50 rounded-xl p-6 border border-purple-900/50 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Latest Club News</h2>

      <div className="relative overflow-hidden rounded-lg h-48">
        {news.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === activeSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="h-full flex flex-col justify-between p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-gray-300 mt-2">{item.content}</p>
              </div>
              <div className="text-sm text-gray-400">
                {new Date(item.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {news.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === activeSlide ? "bg-purple-500" : "bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default NewsCarousel
