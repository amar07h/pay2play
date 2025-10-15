import Image from 'next/image'
import { S3_ENDPOINT } from "@/app.config";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Fragment } from 'react';

type PropType = {
  slides: string[]
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides } = props
  return (
    <Fragment>
       <Carousel className="w-full max-w-7xl">
      <CarouselContent>
       {slides.map((index) => (
          <CarouselItem key={index}>
            <div className="p-1">
 <Image className='
                 pt-20 '
                  src={S3_ENDPOINT +index}
                  height={600} width={1000}
                  alt={index}   />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
       </Fragment>
  )
}

export default EmblaCarousel
