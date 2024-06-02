<!-- omit in toc -->
# Contributing to PillCurve

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues

<!-- omit in toc -->
## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Improving The Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
  - [Code](#code)
  - [Commit Messages](#commit-messages)


## Code of Conduct

This project and everyone participating in it is governed by the
[PillCurve Code of Conduct](https://github.com/aliciusschroeder/pillcurveblob/master/CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior
to <alicius.schroeder@gmail.com>.


## I Have a Question

> If you want to ask a question, we assume that you have read the available information in closed issues, code comments, etc.

Before you ask a question, it is best to search for existing [Issues](https://github.com/aliciusschroeder/pillcurve/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/aliciusschroeder/pillcurve/issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I Want To Contribute

> ### Legal Notice <!-- omit in toc -->
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

### Reporting Bugs

<!-- omit in toc -->
#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions (Make sure that you have read the [documentation](). If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](https://github.com/aliciusschroeder/pillcurveissues?q=label%3Abug).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Collect information about the bug:
  - Stack trace (Traceback)
  - OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
  - Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
  - Possibly your input and the output
  - Can you reliably reproduce the issue? And can you also reproduce it with older versions?

<!-- omit in toc -->
#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to <alicius.schroeder@gmail.com>.
<!-- You may add a PGP key to allow the messages to be sent encrypted as well. -->

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](https://github.com/aliciusschroeder/pillcurve/issues/new). (Since we can't be sure at this point whether it is a bug or not, we ask you not to talk about a bug yet and not to label the issue.)
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the *reproduction steps* that someone else can follow to recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs with the `needs-repro` tag will not be addressed until they are reproduced.
- If the team is able to reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such as `critical`), and the issue will be left to be [implemented by someone](#your-first-code-contribution).

<!-- You might want to create an issue template for bugs and errors that can be used as a guide and that defines the structure of the information to be included. If you do so, reference it here in the description. -->


### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for PillCurve, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

<!-- omit in toc -->
#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation]() carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/aliciusschroeder/pillcurve/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our users and not just a small subset. If you're just targeting a minority of users, consider writing an add-on/plugin library.

<!-- omit in toc -->
#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/aliciusschroeder/pillcurve/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux. <!-- this should only be included if the project has a GUI -->
- **Explain why this enhancement would be useful** to most PillCurve users. You may also want to point out the other projects that solved it better and which could serve as inspiration.

<!-- You might want to create an issue template for enhancement suggestions that can be used as a guide and that defines the structure of the information to be included. If you do so, reference it here in the description. -->

### Your First Code Contribution
Before you begin contributing to PillCurve, make sure you have the following prerequisites installed:

- Node.js
- npm
- Git

To set up the project locally, follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine using `git clone https://github.com/your-username/pillcurve.git`.
3. Navigate to the project directory: `cd pillcurve`.
4. Install the project dependencies by running `npm install`.
5. Create a new branch for your changes: `git checkout -b my-feature-branch`.
6. Make your desired changes and additions to the codebase.
7. Run the project locally using `npm run dev` and verify your changes.
8. Commit your changes: `git commit -m "Add my feature"`.
9. Push your branch to your forked repository: `git push origin my-feature-branch`.
10. Open a pull request on the original repository, describing your changes in detail.

## Styleguides
### Code

To maintain a consistent and readable codebase, please adhere to the following code style guidelines:

1. Use meaningful and descriptive names for variables, functions, and components. Avoid abbreviations and single-letter names unless they are widely understood.

2. Use PascalCase for component names and camelCase for variables and functions. For example, `DosageInput` for a component, `calculateDosage` for a function, and `dosageAmount` for a variable.

3. Use Git branches and pull requests for code reviews and collaboration. Create separate branches for each feature or bug fix, and submit pull requests for merging changes into the main branch.

4. Use single quotes for string literals, unless the string contains a single quote itself. For example, `const message = 'Hello, world!';`.

5. Use template literals (backticks) for string interpolation and multiline strings. For example, `` const greeting = `Hello, ${name}!`; ``.

6. Use semicolons at the end of statements for clarity and consistency.

7. Use arrow functions for short and concise function expressions. For example, `const double = (x) => x * 2;`.

8. Use `const` for variables that are not reassigned and `let` for variables that may be reassigned. Avoid using `var`.

9. Use meaningful and descriptive names for CSS classes and IDs. Follow the BEM (Block-Element-Modifier) naming convention for better organization and maintainability.

10. Keep components small and focused on a single responsibility. Break down larger components into smaller, reusable subcomponents.

11. Use TypeScript to add static typing to your codebase. Specify types for function parameters, return values, and variables when applicable.

12. Use React Hooks for state management and side effects in functional components. Prefer `useState`, `useEffect`, and other built-in hooks over class components.

13. Use Tailwind CSS utility classes for styling components. Avoid writing custom CSS unless absolutely necessary.

### Commit Messages
To maintain a clean and informative commit history, please follow these guidelines when writing commit messages:

1. Use the imperative mood in the subject line. Treat the subject line as if you were giving a command or instruction. For example, "Add dosage input validation" instead of "Added dosage input validation" or "Adds dosage input validation."

2. Limit the subject line to 50 characters or less. This ensures that the subject line is concise and easy to read in various Git tools.

3. Capitalize the first letter of the subject line.

4. Do not end the subject line with a period.

5. Use the body of the commit message to provide additional context and details about the changes made. Explain the motivation behind the changes and any relevant information that helps understand the commit.

6. Wrap the body of the commit message at 72 characters per line. This improves readability and compatibility with various Git tools.

7. If the commit addresses a specific issue or bug, include the issue number in the commit message body. For example, "Fixes #123" or "Resolves #456".

8. If the commit introduces a breaking change, start the subject line with "BREAKING CHANGE:" and provide a clear description of the breaking change and any migration steps in the commit message body.

Example of a well-formatted commit message:
```
Add dosage input validation

- Validate dosage input to ensure positive numeric values
- Display an error message when invalid input is provided
- Update tests to cover dosage input validation

Fixes #123
```

<!-- omit in toc -->
## Attribution
This guide is based on the **contributing-gen**. [Make your own](https://github.com/bttger/contributing-gen)!
