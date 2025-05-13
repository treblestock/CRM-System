<script setup lang="ts">
import type { User, UserFilters, UsersTableColumn, UsersTableColumnTitle, UsersTableSortOption } from '~/types/admin';
// import UserRecord from './UserRecord.vue';
import { Table, Tag } from 'ant-design-vue';
import type { ColumnType } from 'ant-design-vue/es/table';
import UserActionsToolbar from './UserActionsToolbar.vue';
import type { SorterResult, SortOrder, TableCurrentDataSource } from 'ant-design-vue/es/table/interface';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons-vue';


const props = defineProps<{
  users: User[]
  sortBy: UsersTableSortOption
  sortOrder: UserFilters['sortOrder']
}>()

const emit = defineEmits<{
  'update:sortBy': [sortBy: UsersTableSortOption]
  'update:sortOrder': [sortOrder: UserFilters['sortOrder']]
  'updateUsers': []
}>()

// Table layout
const ruTableColumnLabel = {
  username: 'Имя',
  email: 'Email',
  phoneNumber: 'Телефон',
  roles: 'Роли',
  isBlocked: 'Блокировка',
  date: 'Дата регистрации',
} as const satisfies Partial<Record<keyof User, UsersTableColumnTitle>>

const tableColumns: (UsersTableColumn | ColumnType)[] = [
  {
    title: ruTableColumnLabel.username,
    dataIndex: 'username',
    key: 'username',
    sorter: (a: User, b: User) => a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1,
  },
  {
    title: ruTableColumnLabel.email,
    dataIndex: 'email',
    key: 'email',
    sorter: (a: User, b: User) => a.email.toLowerCase() < b.email.toLowerCase() ? -1 : 1,
  },
  {
    title: ruTableColumnLabel.phoneNumber,
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: ruTableColumnLabel.roles,
    dataIndex: 'roles',
    key: 'roles',
  },
  {
    title: ruTableColumnLabel.isBlocked,
    dataIndex: 'isBlocked',
    key: 'isBlocked',
  },
  {
    title: ruTableColumnLabel.date,
    dataIndex: 'date',
    key: 'date',
  },
  {
    key: 'actionToolbar',
  },
]

const tagColors: Record<User['roles'][number], string> = {
  MODERATOR: '#D28E3D',
  ADMIN: '#4976F4',
  USER: '#F4EDF7',
}

//* Sort
const sortMapper: Record<NonNullable<SortOrder>, UserFilters['sortOrder']> = {
  ascend: 'asc',
  descend: 'desc'
}

function handleChangeFilters(
  _pagination: unknown, 
  _filter: unknown, 
  sorter: SorterResult,
  {action}: TableCurrentDataSource) {
  if (action === 'sort') {

    if (!sorter.order) {
      return emit('update:sortBy', 'none')
    } 
    emit('update:sortBy', sorter.field as Extract<UsersTableSortOption, 'username' | 'email'>)
    emit('update:sortOrder', sortMapper[sorter.order])
  }
}

function handleUpdateUsers() {
  emit('updateUsers')
}
</script>

<template>
  <div class="table-wrapper">
    <!-- @vue-ignore -->
    <Table class="table"
      :columns="tableColumns"
      :dataSource="props.users"
      :scroll="{ x: true }"
      rowClassName="user-record"
      @change="handleChangeFilters"
      :pagination="false"
    > 
      <template #bodyCell="{column, record: user}">
          <RouterLink class="user-profile-page-link"
            v-if="(column as UsersTableColumn).dataIndex === 'username'"
            :to="{ 
              name: 'adminUser',
              params: { id: (user as User).id }
            }"
          >
            <UserOutlined />
            {{ (user as User).username }}
          </RouterLink>
          <span class="user-email"
            v-else-if="(column as UsersTableColumn).dataIndex === 'email'"
          > 
            <MailOutlined />
            {{ (user as User).email }}
          </span>
          <span class="user-phone"
            v-else-if="(column as UsersTableColumn).dataIndex === 'phoneNumber'"
          > 
            <PhoneOutlined />
            {{ (user as User).phoneNumber }}
          </span>
          <span class="user-roles"
            v-else-if="(column as UsersTableColumn).dataIndex === 'roles'"
          > 
            <Tag class="user-role"
              v-for="role in (user as User).roles" :key="role"
              :class="`user-role-${role.toLowerCase()}`"
              :color="tagColors[role] || 'geekblue'"
            >
              {{ role }}
            </Tag>
          </span>
          <span class="user-block-status"
            v-else-if="(column as UsersTableColumn).dataIndex === 'isBlocked'"
          > 
            {{ (user as User).isBlocked ? '+' : '-' }}
          </span>
          <span class="user-signup-date"
            v-else-if="(column as UsersTableColumn).dataIndex === 'date'"
          > 
            {{ new Date((user as User).date).toLocaleDateString('ru-RU') }}
          </span>
          <span v-else-if="column.key === 'actionToolbar'">
            <UserActionsToolbar class="user-action-toolbar"
              :user="(user as User)"
              @updateUsers="handleUpdateUsers"
            />
          </span>
      </template>
    </Table>
  </div>
</template>

<style scoped>
@import "~css/consts";

.table-wrapper {
  overflow: hidden;
}

.table {
  font-size: 14px;
  line-height: 1.5;

  :deep(& .ant-table-content) {
    padding-right: 10px;
    max-height: 70vh;
    overflow: auto !important;
  }

  :deep(& table) {
    border-spacing: 0 12px;
  }
}

:deep(.ant-table-cell) {
  text-wrap: nowrap;
}

:deep(.user-record) {
  box-shadow: inset 0px 0px 0px 1px #E4E4E4;
}

.user-profile-page-link {
  color: #000;

  &:hover {
    color: var(--color-primary);
  }
}
.user-email {
  font-weight: 500;
  text-decoration: underline;

  color: #000;
}
.user-phone {
  color: #727272;
}

.user-roles {
  display: inline-flex;
  gap: 10px;
}
.user-role {

  &-admin {
    color: #4976F4;
    background: #EDF2FE;
  }
  &-moderator {
    color: #D28E3D;
    background: #FBF4EC;
  }
  &-user {
    color: #954BAF;
    background: #F4EDF7;
  }
}

.user-block-status {
  color: #727272;
}
.user-signup-date {
  color: #727272;
}

</style>