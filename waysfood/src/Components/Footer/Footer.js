import styles from "./Footer.module.css";
import fb from "../../Assets/png/fb.png";
import gm from "../../Assets/png/gm.png";
import ig from "../../Assets/png/ig.png";
import wa from "../../Assets/png/wa.png";
import yt from "../../Assets/png/yt.png";
import github from "../../Assets/png/github.png";

export default function Footer() {
   return (
      <div className={styles.container}>
         <h3 className={styles.footerTitle}>About Us</h3>
         <p></p>
         <div className={styles.content}>
            <div className={styles.sosmedContainer}>
               <div className={styles.sosmedContent}>
                  <img className={styles.sosmedIcon} src={fb} alt="Facebook" />
                  <p>WaysFood</p>
               </div>
               <div className={styles.sosmedContent}>
                  <img className={styles.sosmedIcon} src={ig} alt="Instagram" />
                  <p>@ways_food</p>
               </div>
               <div className={styles.sosmedContent}>
                  <img className={styles.sosmedIcon} src={wa} alt="WhatsApp" />
                  <p>084999888777</p>
               </div>
               <div className={styles.sosmedContent}>
                  <img className={styles.sosmedIcon} src={yt} alt="YouTube" />
                  <p>WaysFood</p>
               </div>
            </div>
            <div className={styles.aboutContainer}>
               <p>
                  Officia qui ut enim anim nostrud aliqua deserunt Lorem consectetur fugiat. Fugiat excepteur
                  sit Lorem id deserunt. Ex consectetur dolor cillum aute enim officia officia. Esse dolor
                  aute aute dolor commodo elit. Mollit aliquip consequat ipsum officia ea laborum do eiusmod
                  proident et nulla laboris Lorem.
               </p>
            </div>
         </div>
         <p className={styles.copyRight}>
            <img className={styles.githubIcon} src={github} alt="Github Icon" />
            &copy;{" "}
            <a className={styles.aLink} href="https://www.github.com/Coornea">
               Coornea
            </a>
         </p>
      </div>
   );
}
