import {
  ChatBubbleLeftRightIcon,
  ViewColumnsIcon,
  BoltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Real-Time Kanban Boards",
    description:
      "Drag and drop tasks effortlessly. Powered by Appwrite, your boards sync instantly across all devices so your team never misses a beat.",
    icon: ViewColumnsIcon,
  },
  {
    name: "Integrated Internal Inbox",
    description:
      "Stop switching tabs. Our Master-Detail inbox keeps team communication right next to your tasks, ensuring context is never lost.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "Lightning Fast Workflow",
    description:
      "Navigate your workflow with full keyboard support. Built with a focus on speed, accessibility, and intuitive UX.",
    icon: BoltIcon,
  },
  {
    name: "Secure & Accessible",
    description:
      "Built to strict WCAG standards with secure backend authentication, ensuring your data is safe and your tools are usable by everyone.",
    icon: ShieldCheckIcon,
  },
];

export default function Features() {
  return (
    <div id="features" className="bg-background py-24 sm:py-32 text-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-primary dark:text-primary/80 uppercase tracking-wide">
            Deploy Faster
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
            Everything you need for productivity success.
          </p>
          <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
            Ditch the bloated software. Upscaler provides a streamlined "Battle
            Station" to help you manage state, organize tasks, and communicate
            without friction.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-foreground dark:text-foreground">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-primary-foreground"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
