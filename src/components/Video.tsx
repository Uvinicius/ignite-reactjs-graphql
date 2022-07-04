import React from "react";
import { CaretRight, DiscordLogo, FileArrowDown, Lightning } from "phosphor-react";
import { Player, Youtube, DefaultUi } from "@vime/react";
import "@vime/core/themes/default.css";
import { useGetLessonBySlugQuery } from "../graphql/generated";


interface VideoProps {
    lessonSlug: string;
}

const Video:React.FC<VideoProps> = (props:VideoProps) => {
    const { data } = useGetLessonBySlugQuery({
        variables: {
          slug: props.lessonSlug, 
        }
      })
    
      if (!data || !data.lesson) {
        return (
          <div className="flex-1">
            <p>Carregando...</p>
          </div>
        )
      }
    return (
        <div className="flex-1">
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <Player>
                        <Youtube videoId={data?.lesson.videoId}></Youtube>
                        <DefaultUi />
                    </Player>
                </div>

            </div>

            <div className="p-8 max-w-[1100px] mx-auto">
                <div className="flex items-start gap-16">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{data?.lesson.title}</h1>
                        <p className="mt-4 text-gray-200">
                           {data?.lesson.description}
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <img
                                className="h-16 rounded-full border-2 border-blue-500"
                                src={data.lesson.teacher?.avatarURL}
                            />
                        </div>
                        <div className="leading-relaxed">
    
                            <strong className="font-bold text-2xl block">{data.lesson.teacher?.name}</strong>
                            <span className="text-gray-200 text-sm bloco">{data.lesson.teacher?.bio}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">

                        <a className="p-4 text-bg bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors" href="">
                            <DiscordLogo size={24} />
                            Comunidade do Discord
                        </a>

                        <a className="p-4 text-bg border border-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors" href="">
                            <Lightning size={24} />
                            Acesse o Desafio
                        </a>
                    </div>
                </div>

                <div className="gap-8 mt-20 grid grid-cols-2">
                    <a href="" className="bg-gray-700 roundend overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <FileArrowDown size={20} />
                        </div>

                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">Material complementar</strong>
                            <p className="text-sm text-gray-200 mt-2">
                                Acesse o material complementar para acelerar o seu desenvolvimento.
                            </p>
                        </div>
                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>
                    <a href="" className="bg-gray-700 roundend overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <FileArrowDown size={20} />
                        </div>

                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">Wallpapers Exclusivos</strong>
                            <p className="text-sm text-gray-200 mt-2">
                                Clique aqui para baixar os wallpapers exclusivos e personalizar sua máquina.
                            </p>
                        </div>
                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>

                </div>
            </div>
        </div>
    )
}

export { Video }