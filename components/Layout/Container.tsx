export default function Container({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col px-24 py-12 max-h-screen h-full w-full">
            {children}
        </div>
    )
}