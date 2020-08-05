import Service from '@ember/service';

export default class ChangesetSaver extends Service {
  save(changeset) {
    changeset.validate();

    if (changeset.isValid) {
      return changeset.save();
    } else {
      return Promise.reject();
    }
  }

  setError(model, changeset) {
    model.errors.forEach(({ attribute, message }) => {
      changeset.pushErrors(attribute, message);
    });
  }
}