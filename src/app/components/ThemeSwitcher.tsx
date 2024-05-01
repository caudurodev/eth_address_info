"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { Icon } from '@iconify/react'

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div>
            <Switch
                startContent={<Icon icon="ph:moon-bold" />}
                endContent={<Icon icon="ph:sun-bold" />}
                isSelected={theme === 'light'} onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            </Switch>
        </div >
    )
};