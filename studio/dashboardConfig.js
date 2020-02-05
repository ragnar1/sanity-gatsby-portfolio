export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e3a764bd53259b7e0995952',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-portfolio-studio-njgq6uma',
                  apiId: 'e965f744-9439-42fc-a0c7-0681916094e4'
                },
                {
                  buildHookId: '5e3a764bb7cc83ea28f31367',
                  title: 'Portfolio Website',
                  name: 'sanity-gatsby-portfolio-web-x27cm2i3',
                  apiId: '699a3bf2-0d83-4346-903d-d83b09a6e9bb'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/ragnar1/sanity-gatsby-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://sanity-gatsby-portfolio-web-x27cm2i3.netlify.com',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
