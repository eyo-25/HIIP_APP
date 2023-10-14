export default {
  title: 'Plan',
  name: 'plan',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Memo',
      name: 'memo',
      type: 'string',
    },
    {
      title: 'StartDate',
      name: 'startDate',
      type: 'datetime',
    },
    {
      title: 'EndDate',
      name: 'endDate',
      type: 'datetime',
    },
    {
      title: 'Interval',
      name: 'interval',
      type: 'number',
    },
    {
      title: 'FocusTime',
      name: 'focusTime',
      type: 'number',
    },
    {
      title: 'BreakTime',
      name: 'breakTime',
      type: 'number',
    },
    {
      title: 'IsStart',
      name: 'isStart',
      type: 'boolean',
    },
    {
      title: 'Color',
      name: 'color',
      type: 'string',
    },
    {
      title: 'Days',
      name: 'days',
      type: 'array',
      of: [
        {
          type: 'number',
        },
      ],
    },
    {
      title: 'History',
      name: 'history',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'FocusSet',
              name: 'focusSet',
              type: 'number',
            },
            {
              title: 'BreakSet',
              name: 'breakSet',
              type: 'number',
            },
            {
              title: 'FocusTime',
              name: 'focusTime',
              type: 'number',
            },
            {
              title: 'BreakTime',
              name: 'breakTime',
              type: 'number',
            },
            {
              title: 'IsSuccess',
              name: 'isSuccess',
              type: 'boolean',
            },
            {
              title: 'Date',
              name: 'date',
              type: 'datetime',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author.name',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {title, subtitle: `by ${subtitle}`}
    },
  },
}
