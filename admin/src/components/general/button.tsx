import ShimmerButton from "@/components/ui/shimmer-button";

export function Button({ message }: { message: string }) {
  return (
    <div className="z-10 flex mt-3 items-center justify-center">
      <ShimmerButton className="shadow-2xl">
        <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 para-large">
          {message}
        </span>
      </ShimmerButton>
    </div>
  );
}
