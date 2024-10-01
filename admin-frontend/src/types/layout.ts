export interface ISildeBar {
    name: string;
    link?: string;
    children?: Array<{
        name: string;
        link: string;
    }>;
}
