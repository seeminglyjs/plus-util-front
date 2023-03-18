
interface ChildrenProps {
    children: any;
  }

export default function ContentRowDiv({children} : ChildrenProps){
    return (
        <div className="flex flex-col md:flex-row py-5">
            {children}
        </div>
    )
}
