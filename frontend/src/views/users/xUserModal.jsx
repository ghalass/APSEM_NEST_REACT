// src/views/users/UserModal.jsx
import EntityModal from '../components/EntityModal'
import { USER_TYPE } from '../../utils/types'
import useUIStore from '../../stores/store'
import TextInput from '../components/Form/TextInput'
import RadioGroup from '../components/Form/RadioGroup'
import SelectInput from '../components/Form/SelectInput'

const UserModal = ({
  handleCreate,
  entity,
  setEntity,
  errors,
  isDisabled,
  onSubmit,
  onReset,
  errorUnique,
}) => {
  const { op } = useUIStore()
  const diabledOnDelete = isDisabled || op === 'delete'
  return (
    <EntityModal
      handleCreate={handleCreate}
      isDisabled={isDisabled}
      onSubmit={onSubmit}
      onReset={onReset}
      title="Gestion d'un utilisateur"
      errorUnique={errorUnique}
    >
      <div>
        <div className="row">
          <div className="col-8">
            <SelectInput
              id="role"
              label="Choisir un rôle"
              value={entity?.role}
              onChange={(e) => setEntity({ ...entity, role: e.target.value })}
              options={USER_TYPE}
              disabled={diabledOnDelete}
              error={errors?.role}
            />
          </div>
          <div className="col">
            <RadioGroup
              name="activeStatus"
              value={entity?.active}
              onChange={(val) => setEntity({ ...entity, active: val })}
              disabled={diabledOnDelete}
            />
          </div>
        </div>

        <TextInput
          label="Nom de l'utilisateur"
          placeholder="Nom"
          value={entity?.name}
          onChange={(e) => setEntity({ ...entity, name: e.target.value })}
          error={errors?.name}
          disabled={diabledOnDelete}
        />

        <TextInput
          label="Prénom de l'utilisateur"
          placeholder="Prénom"
          value={entity?.lastName}
          onChange={(e) => setEntity({ ...entity, lastName: e.target.value })}
          error={errors?.lastName}
          disabled={diabledOnDelete}
        />

        <TextInput
          type="email"
          label="Email de l'utilisateur"
          placeholder="Email"
          value={entity?.email}
          onChange={(e) => setEntity({ ...entity, email: e.target.value })}
          error={errors?.email}
          disabled={diabledOnDelete}
        />

        <TextInput
          type="password"
          label="Mot de passe de l'utilisateur"
          placeholder="Mot de passe"
          value={entity?.password}
          onChange={(e) => setEntity({ ...entity, password: e.target.value })}
          error={errors?.password}
          disabled={diabledOnDelete}
        />
      </div>
    </EntityModal>
  )
}

export default UserModal
