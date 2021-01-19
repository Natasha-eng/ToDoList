import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {Task, TaskPropsType} from "./Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";

export default {
    title: 'Todolists/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {},
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    task: {
        id: '1', status: TaskStatuses.Completed, title: 'HTML', todoListId: 'todoListID1', startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.High,
        description: ''
    },
    toDoListId: '1'
};

export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    task: {
        id: '2', status: TaskStatuses.New, title: 'JS', todoListId: 'todoListID2', startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.High,
        description: ''
    },
    toDoListId: '2'
};
