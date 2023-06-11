
import MainDiv from "@/components/Layout/MainDiv"
import styles from '/components/Etc/styles/Loading.module.css'
import MainSubDiv from "@/components/Layout/MainSubDiv"
import ContentColDiv from "@/components/Layout/ContentColDiv"
import ContentRowDiv from "@/components/Layout/ContentRowDiv"
import MajoritySubDiv from "@/components/Layout/MajoritySubDiv"
import MajorityDiv from "@/components/Layout/MajorityDiv"

export default function Loading() {
    return (
        <MainDiv>
            <MainSubDiv>
                <ContentColDiv>
                    <ContentRowDiv>
                    <MajoritySubDiv>
                        
                        </MajoritySubDiv>
                        <MajorityDiv>
                        
                            <div className="py-72 my-20 flex justify-center align-middle">
                                <div className={styles.wheel_and_hamster} aria-label="Orange and tan hamster running in a metal wheel" role="img">
                                    <div className={styles.wheel}></div>
                                    <div className={styles.hamster}>
                                        <div className={styles.hamster__body}>
                                            <div className={styles.hamster__head}>
                                                <div className={styles.hamster__ear}></div>
                                                <div className={styles.hamster__eye}></div>
                                                <div className={styles.hamster__nose}></div>
                                            </div>
                                            <div className={`${styles.hamster__limb} ${styles.hamster__limb__fr}`}></div>
                                            <div className={`${styles.hamster__limb} ${styles.hamster__limb__fl}`}></div>
                                            <div className={`${styles.hamster__limb} ${styles.hamster__limb__br}`}></div>
                                            <div className={`${styles.hamster__limb} ${styles.hamster__limb__bl}`}></div>
                                            <div className={styles.hamster__tail}></div>
                                        </div>
                                    </div>
                                    <div className={styles.spoke}></div>
                                </div>
                            </div>                  
                        </MajorityDiv>
                    <MajoritySubDiv>

                    </MajoritySubDiv>
                    </ContentRowDiv>
                </ContentColDiv>
            </MainSubDiv>
        </MainDiv>
    )
}