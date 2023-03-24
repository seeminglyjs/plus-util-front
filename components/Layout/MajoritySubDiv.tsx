
interface ChildrenProps {
    children: React.ReactNode;
  }

export default function MajoritySubDiv({children} : ChildrenProps){
    return (
        <div className="basis-1/12 px-5">
            {children}
        </div>
    )
}
