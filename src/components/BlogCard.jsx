import heroImg from '../assets/hero-dog.jpg'

import { cn } from '@/lib/utils'

export function BlogCard({
  image,
  category,
  title,
  description,
  author,
  date,
  imagePosition = 'center',
}) {
  return (
    <div className="flex flex-col gap-4">
      <a href="#" className="relative h-[212px] sm:h-[360px]">
        <img
          className={cn(
            'h-full w-full rounded-md object-cover',
            imagePosition === 'bottom'
              ? 'object-bottom'
              : imagePosition === 'top'
                ? 'object-top'
                : 'object-center',
          )}
          src={image}
          alt={title}
        />
      </a>
      <div className="flex flex-col">
        <div className="flex">
          <span className="mb-2 rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-green-600">
            {category}
          </span>
        </div>
        <a href="#">
          <h2 className="mb-2 line-clamp-2 text-start text-xl font-bold hover:underline">
            {title}
          </h2>
        </a>
        <p className="text-muted-foreground mb-4 line-clamp-3 grow text-sm">
          {description}
        </p>
        <div className="flex items-center text-sm">
          <img
            className="mr-2 h-8 w-8 rounded-full object-cover"
            src={heroImg}
            alt={author}
          />
          <span>{author}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  )
}
