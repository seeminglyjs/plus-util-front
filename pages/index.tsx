export default function HomePage(){
  return(
      <div>

          안녕하세요 저는 장성우 입니다.
          <div className="gap-6 columns-3 hover:">
              <img className="w-full aspect-video transition duration-500 ease-in-out transform hover:scale-110" src="/test1.jpg" />
              <img className="w-full aspect-video" src="/test1.jpg" />
              <img className="w-full aspect-video" src="/test1.jpg" />
          </div>
      </div>
  )
}