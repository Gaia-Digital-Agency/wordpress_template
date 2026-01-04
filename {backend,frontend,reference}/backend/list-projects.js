#!/usr/bin/env node

/**
 * List GitHub Projects V2 for a user/organization
 */

import { graphql } from '@octokit/graphql';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  token: process.env.GITHUB_TOKEN,
  owner: process.env.GITHUB_OWNER
};

if (!config.token || !config.owner) {
  console.error(chalk.red('Missing GITHUB_TOKEN or GITHUB_OWNER in .env file'));
  process.exit(1);
}

const graphqlWithAuth = graphql.defaults({
  headers: { authorization: `token ${config.token}` }
});

const query = `
  query($owner: String!) {
    user(login: $owner) {
      projectsV2(first: 20) {
        nodes {
          id
          number
          title
          url
          closed
          createdAt
          updatedAt
          items {
            totalCount
          }
        }
      }
    }
  }
`;

async function listProjects() {
  console.log(chalk.cyan.bold(`\n📋 GitHub Projects for ${config.owner}\n`));

  try {
    const result = await graphqlWithAuth(query, { owner: config.owner });
    const projects = result.user.projectsV2.nodes;

    if (projects.length === 0) {
      console.log(chalk.yellow('No projects found.'));
      return;
    }

    console.log(chalk.gray('─'.repeat(80)));
    
    projects.forEach(project => {
      const status = project.closed ? chalk.red('[CLOSED]') : chalk.green('[OPEN]');
      console.log(`\n  ${status} #${project.number} - ${chalk.bold(project.title)}`);
      console.log(chalk.gray(`    Items: ${project.items.totalCount}`));
      console.log(chalk.gray(`    Created: ${new Date(project.createdAt).toLocaleDateString()}`));
      console.log(chalk.blue(`    URL: ${project.url}`));
    });

    console.log(chalk.gray('\n' + '─'.repeat(80)));
    console.log(chalk.cyan(`\nTotal: ${projects.length} projects`));
    console.log(chalk.yellow('\nTo populate a specific project, add PROJECT_NUMBER=<number> to your .env file\n'));

  } catch (error) {
    console.error(chalk.red('Error:'), error.message);
  }
}

listProjects();
