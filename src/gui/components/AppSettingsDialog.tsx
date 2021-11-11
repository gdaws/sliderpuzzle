import React from 'react';
import { UiState } from '../reducer';
import { pictures } from '../assets';
import * as Dialog from './Dialog';
import styles from './AppSettingsDialog.module.css';

interface Props {
  values: UiState;
  onSubmit: (newValue: UiState | undefined) => void;
};

export default function AppSettingsDialog(props: Props) {

  const handleCancel = () => {
    props.onSubmit(void 0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const numbersVisible = formData.get('numbersVisible') === '1';
    const referenceImageVisible = formData.get('referenceImageVisible') === '1';
    const pictureIndex = pictures.indexOf(formData.get('boardImage')?.toString() || '');
    const boardImage = pictureIndex !== -1 ? pictures[pictureIndex] : props.values.boardImage;
    props.onSubmit({...props.values, numbersVisible, referenceImageVisible, boardImage});
  };

  return (
    <Dialog.Frame>
      <form onSubmit={handleSubmit}>
        <Dialog.Header>
          <Dialog.Title>Settings</Dialog.Title>
          <button type="button" className="btn btn-close" onClick={handleCancel} />
        </Dialog.Header>
        <Dialog.Body>
          <div className="form-group">
            <label>Background Picture</label>
            {pictures.map((src, index) => (
              <label key={index} className={styles.boardImageItem}>
                <input type="radio" name="boardImage" value={src} defaultChecked={props.values.boardImage === src} /> 
                <img src={src} alt="" /> 
              </label>)
            )}
          </div>
          <div className="form-group">
            <label><input type="checkbox" name="numbersVisible" value={1} defaultChecked={props.values.numbersVisible} /> Show numbers</label><br/>
            <label><input type="checkbox" name="referenceImageVisible" value={1} defaultChecked={props.values.referenceImageVisible} /> Show reference image</label>
          </div>
        </Dialog.Body>
        <Dialog.Footer>
          <button type="button" className="btn btn-default" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary">Apply</button>
        </Dialog.Footer>
      </form>
    </Dialog.Frame>
  );
}
