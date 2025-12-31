import { Skeleton } from "@/components/ui/skeleton";

export default function BlogCardSkeleton() {
  return (
    <div className="flex w-full flex-col items-start gap-4 p-4 rounded-lg">
      <Skeleton className="h-8 w-24 rounded-lg bg-white/10" />
      
      <div className="hidden w-full gap-14 xl:flex">
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-9 w-full max-w-[600px] bg-white/10" />
          <Skeleton className="h-6 w-full max-w-[500px] bg-white/10" />
          <Skeleton className="h-6 w-full max-w-[400px] bg-white/10" />
          
          <div className="flex flex-1 items-end gap-6 mt-4">
            <Skeleton className="h-5 w-24 bg-white/10" />
            <Skeleton className="h-5 w-32 bg-white/10" />
            <Skeleton className="h-5 w-20 bg-white/10" />
          </div>
        </div>
        
        <Skeleton className="h-[200px] w-[360px] rounded-lg bg-white/10" />
      </div>
      
      <div className="flex flex-col gap-4 xl:hidden w-full">
        <Skeleton className="aspect-video w-full rounded-lg bg-white/10" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-full sm:h-8 bg-white/10" />
          <Skeleton className="h-5 w-full sm:h-6 bg-white/10" />
          <Skeleton className="h-5 w-3/4 sm:h-6 bg-white/10" />
          
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4 mt-2">
            <Skeleton className="h-5 w-24 bg-white/10" />
            <Skeleton className="h-5 w-32 bg-white/10" />
            <Skeleton className="h-5 w-20 bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

