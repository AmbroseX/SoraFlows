'use server'
import MainContent from '@/components/MainContent'
import { LayoutHeader } from '@/components/Header'
import VideoCarousel from '@/components/VideoCarousel'
import Footer from '@/components/Footer'
import { getDictionary } from './dictionaries'
import { translations } from '@/i18n-config'
import { allExampleVideoList } from '@/app/data/openaiExampleVideo'
import { Locale } from '@/i18n-config'
import { shuffleArray } from '@/lib/shuffle'

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(lang) // en
    const videos = allExampleVideoList
    shuffleArray(videos)
    const randomTenVideos = videos.slice(0, 10)
    const metadata = translations[lang || 'zh-CN']
    return (
        <>
            <header>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="icon" href="/logo.png"></link>
            </header>
            <main
                className="flex min-h-screen py-auto flex-col items-center justify-center p-4 bg-home-background bg-cover space-y-6 bg-center">
                <LayoutHeader />
                <div className="top-[10%] left-[15%]">
                    <MainContent dictionary={dictionary} />

                </div>
                {/*<div*/}
                {/*    className="md:w-1/2 md:left-[70%] top-[50%] transform md:-translate-x-1/2 md:-translate-y-1/2">*/}
                <div className="bg-white rounded-2xl border-[14px] border-b-blue-300 p-16">
                    <span className="col-span-3 text-xl md:text-2xl font-bold text-gray-600">Example video generated by Sora</span>
                    <div className="mb-8 gap-5 py-4 [column-count:1] md:mb-12 md:[column-count:2] lg:mb-16 lg:[column-count:3]">
                        {randomTenVideos.map((item) => {
                            return (
                                <div key={item.number} className="border-y border-gray-200 p-2 break-inside-avoid">
                                    <VideoCarousel videos={item} />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <Footer year={new Date().getFullYear()} companyName="SoraFlows" />
            </main>
        </>
    )
}
