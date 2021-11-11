import React, { ReactEventHandler, useState } from 'react';
import { UiState } from '../reducer';
import * as Dialog from './Dialog';

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
    props.onSubmit({...props.values, numbersVisible, referenceImageVisible});
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
