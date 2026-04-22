/**
 * Transforms a flat list into a hierarchical tree structure.
 * 
 * @param {Array} flatList - The flat array of objects.
 * @param {string} idKey - The key for the unique ID (default: 'id').
 * @param {string} parentIdKey - The key for the parent ID (default: 'parent_id').
 * @returns {Array} - The root nodes with nested 'subRows'.
 */
export const transformToTree = (flatList, idKey = 'id', parentIdKey = 'parent_id') => {
    if (!flatList) return []

    // Deep clone to prevent mutation of original list during multiple transforms
    const idMap = {}
    const roots = []

    // 1. Map all items
    flatList.forEach(item => {
        idMap[item[idKey]] = { ...item, subRows: [] }
    })

    // 2. Build Hierarchy
    flatList.forEach(item => {
        const mappedItem = idMap[item[idKey]]
        if (item[parentIdKey] && idMap[item[parentIdKey]]) {
            idMap[item[parentIdKey]].subRows.push(mappedItem)
        } else {
            roots.push(mappedItem)
        }
    })

    return roots
}

/**
 * Filter tree nodes recursively.
 * - Keeps a node if it matches OR if any child matches.
 * - If a node matches, ALL its descendants are kept (to allow exploring context).
 * - If a child matches, the parent is kept.
 */
export const filterTree = (nodes, keyword) => {
    if (!keyword || !keyword.trim()) return nodes

    const lowerKeyword = keyword.toLowerCase()

    const filterNode = (node) => {
        const matchesSelf = node.name.toLowerCase().includes(lowerKeyword)

        // Case 1: Node matches -> Keep it and ALL its children (entire subtree)
        if (matchesSelf) {
            return { ...node } // Clone to avoid mutation side-effects, but keep original subRows
        }

        // Case 2: Node doesn't match -> Check children
        let matchingChildren = []
        if (node.subRows && node.subRows.length > 0) {
            matchingChildren = node.subRows
                .map(filterNode)
                .filter(child => child !== null)
        }

        // Case 3: Children match -> Keep node with only matching children
        if (matchingChildren.length > 0) {
            return { ...node, subRows: matchingChildren, expanded: true } // Auto-expand path to match
        }

        return null
    }

    return nodes.map(filterNode).filter(node => node !== null)
}

/**
 * Recursively collect a node ID and all its descendant IDs from a flat list.
 * @param {Array} flatList - Flat array with parent_id references
 * @param {string} parentId - Starting node ID
 * @returns {string[]} - Array of parentId + all descendant IDs
 */
export const collectDescendantIds = (flatList, parentId) => {
    const result = [parentId]
    const children = flatList.filter(item => item.parent_id === parentId)
    for (const child of children) {
        result.push(...collectDescendantIds(flatList, child.id))
    }
    return result
}

/**
 * Collect a node ID and all its ancestor IDs by walking up parent_id chain.
 * @param {Array} flatList - Flat array with parent_id references
 * @param {string} nodeId - Starting node ID
 * @returns {string[]} - Array of nodeId + all ancestor IDs
 */
export const collectAncestorIds = (flatList, nodeId) => {
    const result = [nodeId]
    const node = flatList.find(item => item.id === nodeId)
    if (node?.parent_id) {
        result.push(...collectAncestorIds(flatList, node.parent_id))
    }
    return result
}
