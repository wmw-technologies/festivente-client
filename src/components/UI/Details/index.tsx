import styles from './index.module.scss';

type Detail = {
  detailName: string;
  detailData: string | number | undefined;
};

type DetailsComponentProps = {
  details: Detail[];
  header: string | undefined;
};

export default function UIDetails({ details, header }: DetailsComponentProps) {
  return (
    <div className={styles['details-container']}>
      <h2>{header}</h2>
      <div className={styles.details}>
        {details.map((detail, index) => (
          <div key={index}>
            <span>{detail.detailName}:</span>
            <p>{detail.detailData}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
