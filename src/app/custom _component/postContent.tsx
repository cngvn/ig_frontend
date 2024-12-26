import { CarouselContent, CarouselItem } from "@/components/ui/carousel";

export const PostContent = ({ postImg }: { postImg: string }) => {
  return (
    <CarouselContent>
      <CarouselItem>
        <img src={postImg} />
      </CarouselItem>
      <CarouselItem>
        <img src={postImg} />
      </CarouselItem>
    </CarouselContent>
  );
};
