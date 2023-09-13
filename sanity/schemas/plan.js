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
      name: 'startdate',
      type: 'datetime',
    },
    {
      title: 'EndDate',
      name: 'enddate',
      type: 'datetime',
    },
    {
      title: 'Interval',
      name: 'interval',
      type: 'number',
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
  ],
  preview: {
    select: {
      title: 'title',
      authorName: 'author.name',
    },
    prepare(selection) {
      const {title, authorName} = selection
      return {title, authorName: `by ${authorName}`}
    },
  },
}
