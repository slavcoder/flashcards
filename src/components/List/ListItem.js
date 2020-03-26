import React from "react";
import styles from "./ListItem.module.scss";

const ListItem = ({type, ...props}) => {
    const color

    return (
        <>
            <li className={styles.item}>
                <div 
                    className={styles.count}
                >
                </div>
                <button 
                    className={styles.listName}
                    {...props}
                >
                </button>
            </li>
        </>
    );
}

export default ListItem;