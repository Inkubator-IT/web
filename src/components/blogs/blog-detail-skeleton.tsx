import { Skeleton } from "@/components/ui/skeleton";

export default function BlogDetailSkeleton() {
  return (
    <div className="relative mx-auto min-h-screen w-full px-4 py-8 sm:px-8 sm:py-12 md:w-[75%]">
      <div className="mb-6 items-start sm:mb-8">
        <Skeleton className="h-6 w-16 bg-white/10" />
      </div>
      
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <Skeleton className="h-7 w-32 rounded-lg sm:w-40 bg-white/10" />
        <Skeleton className="h-10 w-full max-w-[520px] sm:h-12 md:h-14 bg-white/10" />
        
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12">
          <Skeleton className="h-5 w-24 sm:w-32 bg-white/10" />
          <Skeleton className="h-5 w-32 sm:w-40 bg-white/10" />
          <Skeleton className="h-5 w-28 sm:w-36 bg-white/10" />
        </div>
      </div>
      
      <div className="mt-8 flex flex-col sm:mt-10">
        <Skeleton className="h-10 w-32 bg-white/10" />
        <Skeleton className="mt-4 aspect-video w-full rounded-lg sm:mt-6 bg-white/10" />
      </div>
      
      <div className="mt-8 max-w-none space-y-4 sm:mt-10">
        <Skeleton className="h-5 w-full bg-white/10" />
        <Skeleton className="h-5 w-full bg-white/10" />
        <Skeleton className="h-5 w-5/6 bg-white/10" />
        <Skeleton className="mt-4 h-5 w-full bg-white/10" />
        <Skeleton className="h-5 w-4/5 bg-white/10" />
        <Skeleton className="mt-4 h-5 w-full bg-white/10" />
        <Skeleton className="h-5 w-full bg-white/10" />
        <Skeleton className="h-5 w-3/4 bg-white/10" />
      </div>
    </div>
  );
}

