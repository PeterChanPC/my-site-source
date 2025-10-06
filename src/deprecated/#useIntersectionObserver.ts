import { onMounted, onUnmounted, Ref } from "vue";

export function useIntersectionObserver(
  options?: IntersectionObserverInit,
) {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    }, options);
  });

  onUnmounted(() => {
    if (observer) observer.disconnect();
  });

  function observe(
    targetRef: Ref<HTMLElement | null>,
  ) {
    onMounted(() => {
      if (!observer) {
        console.log('Cannot find Observer');
        return;
      };
      if (!targetRef.value) {
        console.log('Invalid targetRef');
        return;
      };
      observer.observe(targetRef.value);
    });
  };

  return { observe };
}

// not used in the project currently