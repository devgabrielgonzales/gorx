"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { useActiveSection } from "@/hooks/use-active-section";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { navItems } from "@/data/content";

export const navLinks = navItems;

export function Header() {
	const scrolled = useScroll(10);
	const active = useActiveSection(navLinks.map((link) => link.href.slice(1)));

	return (
		<header
			className={cn(
				"fixed top-0 z-50 mx-auto w-full max-w-[1600px] border-transparent border-b md:rounded-md md:border transition-all ease-out",
				{
					"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
						scrolled,
				}
			)}
		>
			<nav
				className={cn(
					"flex w-full items-center justify-between px-[5%] py-4 md:transition-all md:ease-out",
					{
						"md:px-2": scrolled,
					}
				)}
			>
				<a
					className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
					href="#hero"
					aria-label="Gorx — início"
				>
					<Image src="/svg/logo.svg" alt="Gorx" width={130} height={34} />
				</a>
				<div className="hidden items-center gap-2 md:flex">
					<div>
						{navLinks.map((link) => (
							<Button
								asChild
								key={link.label}
								size="lg"
								variant="ghost"
								className={cn(
									"text-base",
									active === link.href.slice(1) && "text-primary"
								)}
							>
								<a href={link.href}>{link.label}</a>
							</Button>
						))}
					</div>
					<Button asChild size="lg" className="text-base">
						<a href="mailto:contato@gorx.com.br">Vamos conversar</a>
					</Button>
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
