'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import ReactParallaxTilt from 'react-parallax-tilt'
import { useTranslation } from 'react-i18next'

import Block from '@/components/UI/block/Block'
import {
  getStackIcons,
  getStatusColor,
  type ProjectsSubCategory,
} from '@/types/projects.type'
import { projectsPage } from '@/constants/projectsPage.const'
import Button from '@/components/UI/button/Button'
import { mono, unbounded } from '@/lib/fonts'
import BlockLink from '@/components/UI/block/Link'
import TransitionsProjects from '@/shared/TransitionsProjects'

type SubCategoryKey = keyof ProjectsSubCategory

export default function ProjectsPage() {
  const { t } = useTranslation()

  const categories = projectsPage.flat()

  const [catIndex, setCatIndex] = useState(0)

  const subcatsObj: ProjectsSubCategory = categories[catIndex].projects[0]

  const subcatKeys = Object.keys(subcatsObj) as SubCategoryKey[]

  const [activeSubcat, setActiveSubcat] = useState<SubCategoryKey>(
    subcatKeys[0]
  )

  const currentProjects = subcatsObj[activeSubcat]?.projects ?? []

  return (
    <div className="mx-auto flex max-w-[80rem] flex-col px-6 py-12 md:pt-30">
      <div className="grid gap-6">
        <Link
          className="flex w-fit items-center transition-transform duration-600 ease-in-out hover:scale-102 hover:opacity-90 active:scale-96"
          href="/"
        >
          <div className="flex items-center gap-2">
            <Icon
              className="dark:neutral-300 text-2xl text-neutral-600"
              icon="lucide:house"
            />
            <p className="dark:neutral-300 font-semibold text-neutral-600">
              Вернуться обратно
            </p>
          </div>
        </Link>

        <Block
          className="hover:scale-100"
          heading="projects.md"
          icon="lucide:folder-git-2"
        >
          <div className="grid justify-center gap-4 py-4 sm:justify-between lg:flex">
            <div className="flex items-center gap-4">
              {categories.map((c, i) => (
                <Button
                  className={`flex items-center gap-2 px-4 py-1 ${
                    i === catIndex ? 'bg-gray-200 dark:bg-neutral-600/20' : ''
                  }`}
                  key={c.title}
                  onClick={() => {
                    setCatIndex(i)
                    const firstKey = Object.keys(
                      categories[i].projects[0]
                    )[0] as SubCategoryKey
                    setActiveSubcat(firstKey)
                  }}
                >
                  <div className="relative h-5 w-5">
                    <Icon
                      className={`absolute top-0 left-0 text-xl transition-opacity duration-500 ${
                        i === catIndex ? 'opacity-0' : 'opacity-100'
                      }`}
                      icon={c.icon}
                    />
                    <Icon
                      className={`absolute top-0 left-0 text-xl transition-opacity duration-500 ${
                        i === catIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      icon="lucide:check"
                    />
                  </div>
                  <p className="font-semibold">{t(c.title)}</p>
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {subcatKeys.map((key) => (
                <Button
                  className={`flex items-center gap-2 px-4 py-1 ${
                    key === activeSubcat
                      ? 'bg-gray-200 dark:bg-neutral-600/20'
                      : ''
                  }`}
                  key={key}
                  onClick={() => setActiveSubcat(key)}
                >
                  <div className="relative h-5 w-5">
                    <Icon
                      className={`absolute top-0 left-0 text-xl transition-opacity duration-500 ${
                        key === activeSubcat ? 'opacity-0' : 'opacity-100'
                      }`}
                      icon={subcatsObj[key]?.icon || ''}
                    />
                    <Icon
                      className={`absolute top-0 left-0 text-xl transition-opacity duration-500 ${
                        key === activeSubcat ? 'opacity-100' : 'opacity-0'
                      }`}
                      icon="lucide:check"
                    />
                  </div>
                  <p className="font-semibold">{t(key)}</p>
                </Button>
              ))}
            </div>
          </div>

          <TransitionsProjects uniqueKey={`${catIndex}-${activeSubcat}`}>
            {currentProjects.length > 0 ? (
              <div className="grid gap-8 lg:grid-cols-2">
                {currentProjects.map((p, idx) => (
                  <ReactParallaxTilt
                    key={idx}
                    perspective={2000}
                    scale={1.03}
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    tiltReverse
                    transitionEasing="cubic-bezier(0.215,0.61,0.355,1)"
                    transitionSpeed={2000}
                  >
                    <BlockLink
                      className="relative grid gap-4 p-6 hover:scale-100"
                      external={true}
                      href={p.link}
                    >
                      <div className="absolute top-2 right-2 z-0">
                        <div className="hidden lg:flex">
                          {p.background && (
                            <Image
                              alt={p.name}
                              className="max-h-[150px] rounded-xl opacity-30"
                              height={150}
                              src={p.background}
                              width={350}
                            />
                          )}
                        </div>
                      </div>
                      <div className="z-1 flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {p.icon && (
                            <div className="relative">
                              <Image
                                alt={p.name}
                                className="rounded-full"
                                height={32}
                                src={p.icon}
                                width={32}
                              />
                              <div className="absolute -top-6 -left-6">
                                <div
                                  className={`${p.glowColor} block size-24 rounded-full opacity-30 blur-[50px]`}
                                />
                              </div>
                            </div>
                          )}
                          <div className="grid items-center gap-5 md:flex">
                            <p
                              className={`${unbounded.className} text-md text-neutral-800 dark:text-neutral-200`}
                            >
                              {t(p.name)}
                            </p>
                            <p
                              className={`${mono.className} text-sm text-neutral-700 dark:text-neutral-300`}
                            >
                              {p.version} {p.shortLink}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="z-1 grid gap-2 md:flex md:gap-4">
                        {p.stack.map((tech, j) => {
                          const icon = getStackIcons([tech])[0]
                          return (
                            <div className="flex items-center gap-2" key={j}>
                              <Icon className="text-xl" icon={icon} />
                              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                {tech}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                      <div className="z-1 grid items-center gap-4 md:flex md:gap-8">
                        <div className="flex items-center gap-2">
                          <Icon
                            className="text-lg"
                            icon="lucide:server"
                            style={{ color: getStatusColor(p.statusText) }}
                          />
                          <p
                            className="text-[12px] font-semibold"
                            style={{ color: getStatusColor(p.statusText) }}
                          >
                            {t(p.statusText)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 font-semibold opacity-80">
                          {!p.source ? (
                            <>
                              <Icon
                                className="text-lg text-red-500"
                                icon="lucide:github"
                              />
                              <p className="text-[12px] text-red-500">
                                Source code closed
                              </p>
                            </>
                          ) : (
                            <>
                              <Icon
                                className="text-lg text-emerald-400"
                                icon="lucide:github"
                              />
                              <p className="text-[12px] text-emerald-400">
                                Source code open
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="z-1 text-[13px] font-semibold">
                        {t(p.description)}
                      </p>
                    </BlockLink>
                  </ReactParallaxTilt>
                ))}
              </div>
            ) : (
              <div className="flex size-full flex-col items-center justify-center text-center">
                <div className="flex flex-col items-center justify-center gap-8">
                  <p className="text-xl font-semibold text-neutral-800 md:text-2xl dark:text-neutral-200">
                    Not found
                  </p>
                  <p className="text-[14px] text-neutral-700 opacity-70 md:text-lg dark:text-neutral-200">
                    Пока что в данной категории нет проектов...
                  </p>
                </div>
              </div>
            )}
          </TransitionsProjects>
        </Block>
      </div>
    </div>
  )
}
