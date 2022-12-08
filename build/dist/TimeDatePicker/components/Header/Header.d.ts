import React from "react";
interface HeaderProps {
    changeMonth: (type: string) => void;
    onToggleTime?: () => void;
    onToggleMonth?: () => void;
}
declare const Header: React.FC<HeaderProps>;
export { Header };
