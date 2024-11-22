import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
//
import {
    primaryFont,
    CommonLayout,
    ThemeProvider,
    SettingsProvider,
} from "@/resources";
import { PATHS } from "@/config";
//
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
    title: "taskbox",
    description: "new and improved - in nextjs",
};

export default async function RootLayout({ children }) {
    const header_url = headers().get("x-url") || "";

    const session = await getServerSession(authOptions);

    if (header_url?.includes(PATHS["login"]) && !!session) {
        return redirect(PATHS["home"]);
    } else if (
        header_url?.substring(header_url?.lastIndexOf("/")) === PATHS["home"] &&
        !session
    ) {
        return redirect(PATHS["login"]);
    }

    return (
        <html lang="en">
            <body className={primaryFont.className}>
                <SettingsProvider session={session}>
                    <ThemeProvider>
                        <CommonLayout>{children}</CommonLayout>
                    </ThemeProvider>
                </SettingsProvider>
            </body>
        </html>
    );
}
