/*
Hard Rules:
1. Common & navigator components have their own aliases and index files, respectively.

General Philosophy:
1. Should only have to change one path to relocate the folder of a [whole] feature.
2. Feature sub-components and other files related to a feature should be located within the folder of the feature that references them. The should not be aliased, just referenced locally with import paths.
3. Sub-components (that are not also common components) should be arranged in the same folder ('./SubComponent') or a sub-folder ('sub-component/SubComponent).  The location of sub-components should not require path navigation outside the feature folder (i.e., '../' relative paths).
4. All common components should be aliased '@common' and referenced in index.js of common folder.  Not here.
5. Any sub-components that is referenced by two or more features should be aliased and indexed as common component.  If the sub-component was previously in a feature folder, it needs to be moved to common once it is referenced by more than one feature.
*/
