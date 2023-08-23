export interface ISildeBar {
    name: string;
    icon: React.ReactElement;
    link?: string;
    children?: Array<{
        name: string;
        link: string;
    }>;
}
