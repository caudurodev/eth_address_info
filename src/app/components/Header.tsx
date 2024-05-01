"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { ThemeSwitcher } from '@/app/components/ThemeSwitcher'
import { Icon } from '@iconify/react'

export const Header = () => {
    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <h4 className="text-black dark:text-white">
                    <Icon icon="ri:eth-fill" className="inline mr-1" />
                    Ethereum Address Data
                </h4>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
export default Header